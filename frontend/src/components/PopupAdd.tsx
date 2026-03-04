import { ButtonAI } from './atoms/ButtonAI';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FormField } from './molecules/FormField';
import { FormSelect } from './molecules/FormSelect';
import { FormFieldTags } from './molecules/FormFieldTags';
import Button from './atoms/Button';
import { useState } from 'react';
import { useMaterials } from '../hooks/useMaterials';
import { toast } from 'react-toastify';

const schema = z.object({
  title: z.string().min(1, "Title is required."),
  type: z.enum(["Vídeo", "PDF", "Link"], { error: "Type is required." }),
  description: z.string().min(1, "Description is required."),
  url: z.string().min(1, "URL is required."),
  tags: z.array(z.string()).optional(),
})

type FormFields = z.infer<typeof schema>;

type PopupAddProps = {
  addIsOpen: boolean;
  setAddIsOpen: (value: boolean) => void;
  addMaterial: (data: FormFields) => Promise<any>; // recebe a função de fora
}

export function PopupAdd({ addIsOpen, setAddIsOpen, addMaterial }: PopupAddProps) {
  const { 
    register, handleSubmit, reset, setValue, control, formState: { errors, isSubmitting } 
  } = useForm<FormFields>({ 
    resolver: zodResolver(schema),
    defaultValues: { tags: [] }, // importante!
  });
  const tags = useWatch({ control, name: 'tags' }) ?? [];
  
  const { generateAIContent } = useMaterials();
  const [isGenerating, setIsGenerating] = useState(false);
  const title = useWatch({ control, name: 'title' });
  const type = useWatch({ control, name: 'type' });
  const canUseAI = !!(title?.trim() && type);

  const handleAIHelp = async () => {
    if (!canUseAI) return;
    try {
      setIsGenerating(true);
      const content = await generateAIContent(title, type);
      if (content) {
        setValue('description', content.description, { shouldValidate: true });
        setValue('tags', content.tags, { shouldValidate: true });
      }
    } catch {
      toast.error('Falha ao gerar conteúdo IA.');
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await addMaterial(data);
      console.log("Material added!", response);
      toast.success('Material adicionado com sucesso!');
      reset();           // limpa o form após sucesso
      setAddIsOpen(false); // fecha o popup após sucesso
    } catch (error) {
      toast.error('Falha ao adicionar material.');
    }
  };

  return (
    <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-slate-900/70">

        <DialogPanel className="max-w-xl w-full space-y-4 border border-6 border-slate-200 rounded-4xl bg-white p-6 text-slate-900">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold text-2xl">Adicionar Material Educacional</DialogTitle>
            <ButtonAI   handleAIHelp={handleAIHelp} canUseAI={canUseAI} isGenerating={isGenerating} sparkleAI={sparkleAI}  />
          </div>

          <form onSubmit={handleSubmit(onSubmit, (errs) => console.log("Validation errors:", errs))}>
            <FormField register={register} errors={errors} name="title" label="Título:" placeholder="Digite título" />
            <FormSelect
              register={register}
              errors={errors}
              name="type"
              label="Tipo:"
              options={[
                { value: "Vídeo", label: "Vídeo" },
                { value: "PDF", label: "PDF" },
                { value: "Link", label: "Link" },
              ]}
            />
            <FormField register={register} errors={errors} name="description" label="Descrição:" placeholder="Digite descrição" />
            <FormField register={register} errors={errors} name="url" label="URL:" placeholder="Digite URL" />
            <FormFieldTags
                value={tags}
                onChange={(newTags) => setValue('tags', newTags)}
                label="Tags:"
                error={errors.tags?.message}
            />


            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setAddIsOpen(false)}
                className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <Button type="submit" mainText="Adicionar" showText={true} isSubmitting={isSubmitting} />
            </div>
          </form>

        </DialogPanel>
      </div>
      
    </Dialog>
  );

  function sparkleAI() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>;
  }
  }