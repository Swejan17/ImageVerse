"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CustomField } from "./CustomField"
import { aspectRatioOptions, transformationTypes } from "@/constants"
import { useState } from "react"
import { AspectRatioKey } from "@/lib/utils"

export const formSchema = z.object({
    title: z.string(),
    aspectRatio:z.string().optional(),
    color:z.string().optional(),
    prompt:z.string().optional(),
    publicId:z.string(),
})

export default function TranformationForm({action,data=null,userId,type,creditBalance,config=null}:TransformationFormProps) {

    const transformationType = transformationTypes[type]
    const [image,setImage] = useState(data)
    const [newTranformation,setNewTranformation] = useState<Transformations | null>(null)
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [isTranforming,setIsTranforming] = useState(false)
    const [tranformationConfig,setTranformationConfig] = useState(config)
    const initailValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId
    } : {
        title: '',
        aspectRatio: '',
        color: '',
        prompt: '',
        publicId: ''

    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initailValues
    })
 

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }
    const onselecthandler =(value:string,onChangeField:(value:string)=>void)=>{

    }
    const onInputChangeHandler =(fieldName:string,value:string,type:TransformationTypeKey,onChangeField:(value:string)=>void)=>{

    }
    const onTranformHandler=()=>[

    ]
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
            control={form.control}
            name="title"
            formLabel="Image Title"
            className="w-full"
            render={({ field }) => <Input {...field} placeholder="Title" />}
        />
        
        {
            type === 'fill' && (
                <CustomField 
                    control={form.control}
                    name="aspectRatio"
                    formLabel="Aspect Ratio"
                    className="w-full"
                    render={({field}) => (
                        <Select onValueChange={(value)=>{
                            onselecthandler(value,field.onChange)
                        }}>
                        <SelectTrigger className="select-field">
                            <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.keys(aspectRatioOptions).map((key)=>{
                                    return (
                                        <SelectItem key={key} value={key}>
                                            {aspectRatioOptions[key as AspectRatioKey].label}
                                        </SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                        </Select>

                    )}
                />
            )
        }
        {
            (type === 'remove' || type === 'recolor') &&(
                <div className="prompt-field">
                    <CustomField 
                        control={form.control}
                        name="prompt"
                        formLabel={
                            type === 'remove' ? 'Object to Remove' : 'Object to Recolor'
                        }
                        className="w-full"
                        render={({field}) => 
                        <Input value={field.value} className="input-field" onChange={(e)=>onInputChangeHandler(
                            'prompt',
                            e.target.value,
                            type,
                            field.onChange
                        )}/>}
                    />
                    {
                        type === 'recolor' && (
                            <CustomField 
                                control={form.control}
                                name="color"
                                formLabel="Replacement Color"
                                className="w-full"
                                render={({field}) => 
                                <Input value={field.value} className="input-field" onChange={(e)=>onInputChangeHandler(
                                    'color',
                                    e.target.value,
                                    'recolor',
                                    field.onChange
                                )}/>}
                            />
                        )
                    }
                </div>
            )
        }
        <div className="flex flex-col gap-4">
            <Button type="button" 
                className="submit-button capitalize" 
                disabled={newTranformation===null  || isTranforming}
                onClick={onTranformHandler}

            >{isTranforming ? "Tranforming...":'Apply Tranformation'}</Button>
            <Button type="submit" 
                className="submit-button capitalize" 
                disabled={isSubmitting }

            >{isSubmitting?"Submitting..." :'Save Image'}</Button>
      
        </div>
        </form>

    </Form>
  )
}
