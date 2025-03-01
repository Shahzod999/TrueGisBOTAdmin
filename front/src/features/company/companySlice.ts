import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface selectedCompanyType {
  company: {
    token: string;
    company_id?: string;
    _id?: string;
    name: string;
    address: string;
    logo: string;
    permissions: {
      [key: string]: boolean;
    };
  } | null;
  token: string | null;
}

const storedCompany = JSON.parse(localStorage.getItem("company") || "{}");
const storedCompanyToken = localStorage.getItem("companyToken") || null;

const initialState: selectedCompanyType = {
  company: storedCompany,
  token: storedCompanyToken,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
      localStorage.setItem("company", JSON.stringify(action.payload));
    },
    setCompanyToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("companyToken", action.payload);
    },
  },
});

export const { setCompany, setCompanyToken } = companySlice.actions;
export const selectedCompany = (state: RootState) => state.company.company;
export const selectedCompanyToken = (state: RootState) => state.company.token;

export default companySlice.reducer;
