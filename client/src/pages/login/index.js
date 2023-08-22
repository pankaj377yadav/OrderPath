import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import styles from "@/styles/form.module.css"


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
      <div className={styles.body}>
        <Formik
          initialValues={{
            fullName: '',
            phoneNumber: '',
            password: '',
          }}
          onSubmit={values => {
            triggerLogin(values)
      
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <h2 className={styles.title}>Login</h2>

              <Field name="fullName" placeholder="Full Name" type="text" className={styles.input}/>
              {errors.fullName && touched.fullName ? (
                <div>{errors.phoneNumber}</div>
              ) : null} <br/>
              <Field name="phoneNumber" placeholder="Phone Number" type="number"  className={styles.input}/>
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
              <br/>
              <Field name="password" placeholder="Password" type="password" className={styles.input}/>
              {errors.password && touched.password? (
                <div>{errors.password}</div>
              ) : null}
              <br/>
              <br/>
              <button type="submit" className={styles.submit}>Submit</button>
              <br/>
              <br/>
             Dont have an account yet ? 
             <br/>
             <br/>
              <Link href="/register" className={styles.submit}>Sign Up</Link>
            </Form>
          )}
        </Formik>
        </div>
    )
}


export default Login