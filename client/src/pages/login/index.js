import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'

const Login = ( )=> {
    const triggerLogin = async(values)=>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    const res = await fetch('http://localhost:3001/login', requestOptions)
    const data = await res.json()
  
    }
    return (
        <div>
      
        <Formik
          initialValues={{
            phoneNumber: '',
            password: '',
          }}
          onSubmit={values => {
            triggerLogin(values)
      
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="phoneNumber" placeholder="phoneNumber"/>
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
              <br/>
              <Field name="password" placeholder="password"/>
              {errors.password && touched.password? (
                <div>{errors.password}</div>
              ) : null}
              <br/>
              <button type="submit">Submit</button>
             Dont have an account yet ?  <Link href="/register">Sign Up</Link>
            </Form>
          )}
        </Formik>
        </div>
    )
}


export default Login