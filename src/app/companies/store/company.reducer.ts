import { Company } from '../company.model';
import * as CompanyAction from './company.action';
export interface State {
  companies: Company[];
  isLoading: boolean;
  errorMsg: string;
}

const initState: State = {
  companies: [],
  isLoading: false,
  errorMsg: null,
};

export function companyReducer(
  state = initState,
  action: CompanyAction.CompanyActions
) {
  switch (action.type) {
    case CompanyAction.SET_COMPANIES:
      return {
        ...state,
        isLoading: false,
        companies: [...action.payLoad],
        errorMsg: null
      };

    case CompanyAction.FETCH_COMPANIES:
      return {
        ...state,
        isLoading: true,
        errorMsg: null
      };

    case CompanyAction.FETCH_COMPANIES_ERROR:
      return{
        ...state,
        isLoading: false,
        errorMsg: action.payLoad
      }
    case CompanyAction.ADD_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.payLoad],
        errorMsg: null
      };

    case CompanyAction.UPDATE_COMPANY:
      const updatedCompany = {
        ...state.companies[action.payLoad.index],
        ...action.payLoad.company,
      };
      const updatedCompanies = [...state.companies];
      updatedCompanies[action.payLoad.index] = updatedCompany;
      return {
        ...state,
        companies: updatedCompanies,
        errorMsg: null
      };

    case CompanyAction.DELETE_COMPANY:
      const deletedCompanies = [...state.companies];
      deletedCompanies.splice(action.payLoad, 1);
      return {
        ...state,
        companies: [...deletedCompanies],
        errorMsg: null
      };

      case CompanyAction.CLEAR_ERROR:
        return{
          ...state,
          errorMsg: null,
          isLoading: false
        }
    default:
      return state;
  }
}
