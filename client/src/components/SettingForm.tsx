import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { CustomFormField } from "./FormField";
import { Button } from "./ui/button";

const SettingForm = ({
    initialData,
    onSubmit,
    userType
}: SettingsFormProps ) => {
    const [editMode, seEditMode] = useState(false);
    const form  = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),  
             defaultValues: initialData
    });
    const toggleEditMode = () => {
        seEditMode(!editMode);
        if(editMode) {
            form.reset(initialData)
        }
    };
    const handleSubmit = async (data: SettingsFormData) => {
        await onSubmit(data);
        seEditMode(false);
    }

  return (
    <div className='pt-8 pb-5 px-8'>
        <div className='mb-5'>
            <h1 className='text-xl font-semibold items-center justify-center'>
                {`${userType} settings`}
                
            </h1>
            <p className='text-gray-600 text-sm mt-1'>
                {`Manage your ${userType} settings and preferences.`}
            </p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-5'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                <CustomFormField name="name" label="Name" disabled={!editMode} />
            <CustomFormField
              name="email"
              label="Email"
              type="email"
              disabled={!editMode}
            />
            <CustomFormField
              name="phoneNumber"
              label="Phone Number"
              disabled={!editMode}
            />

                    <div className='pt-4 flex justify-between'>
                        <Button 
                            type='button'
                            variant='outline'
                            onClick={toggleEditMode}
                            className='bg-secondary-600 text-white hover:bg-secondary-700'
                        >
                            {editMode ? 'Cancel' : 'Edit'}
                        </Button>
                        { editMode && (
                            <Button
                                type='submit'
                                className='bg-primary-600 text-white hover:bg-primary-700'
                            >
                                Save
                            </Button>
                        )}
                        

                    </div>
                    </form>
            </Form>

        </div>
    </div>
  )
}

export default SettingForm