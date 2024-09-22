import Header from '@/components/shared/Header'
import TranformationForm from '@/components/shared/TranformationForm'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


const AddTransformationTypePage =async ({params:{type}}:SearchParamProps) => {
  const transformation = transformationTypes[type]
  const {userId} = auth()
  if(!userId) return redirect('/sign-in')
  const user = await getUserById(userId)

  return (
    <>
   <Header 
    title={transformation.title}
    subtitle={transformation.subTitle}
   />
   <section className='mt-10'>
    <TranformationForm action='Add' 
        userId={user._id} 
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
   </section>

   </>
  )
}

export default AddTransformationTypePage
