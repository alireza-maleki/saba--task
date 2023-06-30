import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #14213d;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UserDetail = styled.div`
    width: 450px;
    height: 350px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    
`;

const Title = styled.h2`
    text-align: center;
`;

const Input = styled.input`
padding: 1rem 1.5rem;
width: 70%;
border: 0.1rem solid #b7b7b7;
border-radius: 5px;
outline: none;
margin: 1rem 0;
background-color: #fff;
font-size: 1.2rem;
`;

const Label = styled.label`
position: absolute;
top: 3px;
right: 60px;
background-color: #fff;
padding: 0 0.5rem;
font-size: 14px;
`;

const Form = styled.div`
width: 100%;
  margin: 0 auto;
  text-align: center;
  position: relative;
`;


const Button = styled.button`
padding: 0.8rem 2rem;
background-color: #fca311;
color: #fff;
font-size: 18px;
border-radius: 3px;
border: none;
font-weight: bold;
cursor: pointer;
transition: 0.3s all;
outline: none;


&:hover,
&:active {
    background-color: #14213d;
}
  
`;

const ShowError = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: red;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 0.5rem 1.5rem; 
    cursor: pointer;
`;


const Login = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const submitFormHandler = (e) => {
        e.preventDefault();

        if (!userName || !userPassword) {
            return
        }

        navigate('/home');
    }



    return (
        <Container>

            <UserDetail>
                <Title>ورود / ثبت نام</Title>

                <Form>
                    <Label>نام کاربری</Label>
                    <Input
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form>

                <Form>
                    <Label>رمز ورود</Label>
                    <Input
                        type='password'
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </Form>

                <div
                    style={{ margin: '4% auto', width: '100%', textAlign: 'center' }}
                >
                    <Button
                        onClick={submitFormHandler}>
                        ورود
                    </Button>
                </div>

            </UserDetail>

        </Container>
    )
}

export default Login