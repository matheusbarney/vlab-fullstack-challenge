import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FormField } from './molecules/FormField';
import { FormSelect } from './molecules/FormSelect';
import { FormFieldTags } from './molecules/FormFieldTags';
import Button from './atoms/Button';

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
    register, handleSubmit, setError, reset, setValue, control, formState: { errors, isSubmitting } 
  } = useForm<FormFields>({ 
    resolver: zodResolver(schema),
    defaultValues: { tags: [] }, // importante!
  });
  const tags = useWatch({ control, name: 'tags' }) ?? [];

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await addMaterial(data);
      console.log("Material added!", response);
      reset();           // limpa o form após sucesso
      setAddIsOpen(false); // fecha o popup após sucesso
    } catch (error) {
      setError("root", { message: 'Something went wrong.' });
    }
  };

  return (
    <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-slate-900/70">

        <DialogPanel className="max-w-2xl w-full space-y-4 border border-6 border-slate-200 rounded-4xl bg-white p-6 text-slate-900">
          
          <DialogTitle className="font-bold text-2xl">Add Material</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit, (errs) => console.log("Validation errors:", errs))}>
            <FormField register={register} errors={errors} name="title" label="Title:" placeholder="Enter title" />
            <FormSelect
              register={register}
              errors={errors}
              name="type"
              label="Type:"
              options={[
                { value: "Vídeo", label: "Vídeo" },
                { value: "PDF", label: "PDF" },
                { value: "Link", label: "Link" },
              ]}
            />
            <FormField register={register} errors={errors} name="description" label="Description:" placeholder="Enter description" />
            <FormField register={register} errors={errors} name="url" label="URL:" placeholder="Enter URL" />
            <FormFieldTags
                value={tags}
                onChange={(newTags) => setValue('tags', newTags)}
                label="Tags:"
                error={errors.tags?.message}
            />

            {errors.root && (
              <p className="text-red-500 text-sm">{errors.root.message}</p>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setAddIsOpen(false)}
                className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <Button type="submit" mainText="Add" showText={true} isSubmitting={isSubmitting} />
            </div>
          </form>

        </DialogPanel>
      </div>
      
    </Dialog>
  );
}