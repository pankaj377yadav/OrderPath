import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useState} from 'react'
import Link from 'next/link';
import styles from "@/styles/form.module.css"


const Register = ( )=> {
  const [role, setRole] = useState("user")
   
    return (
        <div className={styles.body}>
    
      
        <Formik
          initialValues={{
            fullName: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            email: ''
          }}
          onSubmit={values => {
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values)
          };
          fetch('http://localhost:3001/register', requestOptions)
      
          }}
        >
          {({ errors, touched }) => (
              <Form className={styles.form}>
              <h2 className={styles.title}>Register</h2>


              <Field name="fullName" placeholder="Full Name" type="text" className={styles.input}/>
              {errors.fullName && touched.fullName ? (
                <div>{errors.phoneNumber}</div>
              ) : null}<br/>
              <Field name="phoneNumber" placeholder="Phone Number" type="number" className={styles.input}/>
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
              <br/>
              <Field name="email"  placeholder="Email" type="email" className={styles.input}/>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <br/>
              <Field name="password" placeholder="Password" type="text" className={styles.input}/>
              {errors.password && touched.password? (
                <div>{errors.password}</div>
              ) : null}
              <br/>
              <Field name="confirmPassword" placeholder="Confirm Password" type="text" className={styles.input}/>
              {errors.confirmPassword && touched.confirmPassword? (
                <div>{errors.confirmPassword}</div>
              ) : null}
              <br/>
              <Field as="select" name="role" className={styles.input}>
                <option value="User" onClick={()=>setRole("user")}>User</option>
                <option value="Rider" onClick={()=>setRole("rider")}>Rider</option>
                <option value="Admin" onClick={()=>setRole("rider")}>Admin</option>
              </Field>
              <br/>
              <button type="submit"  className={styles.submit}>Submit</button>
              Already User! {role}
              <br/> <Link href="/login" className={styles.submit}>Sign in</Link>
            </Form>
          )}
        </Formik>
        </div>
    )
}


export default Register