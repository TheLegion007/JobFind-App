import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
  name:'',
  email:'',
  password:'',
  isMember: true
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const {user, isLoading} = useSelector(store=>store.user);
  const dispatch = useDispatch();
 
  const handleChange = (e) => {
    //console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    setValues({...values,[name]:value});

    //console.log(`${name}:${value}`);
    //console.log(`${name} :` + `${value}`);

  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(e.target);
    const {name, email, password, isMember} = values;
    if(!email || !password || (!isMember && !name)) {
        //console.log("sf" , values);
        toast.error("Please fill out all fields !");
        return;
    }
    if(isMember) {
      dispatch(loginUser({ email:email ,password:password}));
      return;
    }
    dispatch(registerUser({name:name, email:email, password:password}));
  };

  const toggleMember = () => {
      setValues({...values, isMember: !values.isMember});
      console.log("values : " , values);
  };


  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember ? 'Login': 'SignUp'}</h3>

        {/*name field*/}
        {!values.isMember && (
          <FormRow type='text' name="name" value={values.name} handleChange={handleChange}/> 
        )} 

        {/*email field*/}
        <FormRow type='email' name="email" value={values.email} handleChange={handleChange}/>
        {/*Password field*/}
        <FormRow type='password' name="password" value={values.password} handleChange={handleChange}/>
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          {values.isMember? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? 'Register' : 'Login' }
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register;