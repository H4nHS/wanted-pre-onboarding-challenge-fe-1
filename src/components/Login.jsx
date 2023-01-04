import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/slice/authSlice";

const Sign = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);

    const isDoneEmail = (value) => {
        return /\w+@\w+\.\w/.test(value);
    };
    const isDonePassword = (value) => {
        return value.length >= 8;
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserInfo({ ...userInfo, [name]: value });
        if (name === "email") {
            setCheckEmail(isDoneEmail(value));
        } else {
            setCheckPassword(isDonePassword(value));
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(login(userInfo));
    };

    useEffect(() => {
        if (localStorage.getItem(`token`) !== null) {
            navi("/todo");
        }
    }, [token]);

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input onChange={onChangeHandler} type="text" id="email" name="email" placeholder="이메일을 입력해주세요."></input>
                <input onChange={onChangeHandler} type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요."></input>
                <button disabled={checkEmail && checkPassword ? false : true}>로그인</button>
            </form>

            <span onClick={() => navi("/sign")}>회원가입 하러가기</span>
        </div>
    );
};

export default Sign;
