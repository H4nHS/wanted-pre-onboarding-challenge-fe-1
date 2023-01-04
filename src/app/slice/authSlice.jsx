import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const join = createAsyncThunk("authSlice/join", async (payload, thunkAPI) => {
    console.log(payload);
    try {
        const response = await axios.post("http://localhost:8080/users/create", payload);
        console.log(response);
        return thunkAPI.fulfillWithValue(response);
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk("authSlice/login", async (payload, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:8080/users/login", payload);
        console.log(payload);
        return thunkAPI.fulfillWithValue(response);
    } catch (error) {
        console.log(error.response);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: function (builder) {
        //회원가입
        builder.addCase(join.pending, (state, { payload }) => {
            console.log(payload);
        });

        builder.addCase(join.fulfilled, (state, action) => {
            console.log(action.payload.data);
            return action.payload.data;
        });

        builder.addCase(join.rejected, (state, action) => {
            alert(action.payload.details);
        });

        //로그인
        builder.addCase(login.pending, (state, { payload }) => {
            console.log(payload);
        });

        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action);
            alert(action.payload.data.message);
            localStorage.setItem("token", action.payload.data.token);
            return action.payload.data;
        });

        builder.addCase(login.rejected, (state, action) => {
            alert(action.payload.details);
        });
    },
});
