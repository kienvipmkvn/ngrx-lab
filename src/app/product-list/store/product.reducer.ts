import { Product } from '../../shared/product.model';
import * as ProductActions from './product.action';

export interface State {
  products: Product[];
  edittedProduct: Product;
  edittedIndex: number;
}

const initState: State = {
  products: [],
  edittedProduct: null,
  edittedIndex: -1,
};

export function productReducer(
  state: State = initState,
  action: ProductActions.ProductActions
) {
  switch (action.type) {
    case ProductActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payLoad],
      };

    case ProductActions.ADD_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payLoad],
      };

    case ProductActions.UPDATE_PRODUCT:
      const product = state.products[state.edittedIndex];
      const updatedProduct = {
        ...product,
        ...action.payLoad,
      };
      const updatedProducts = [...state.products];
      updatedProducts[state.edittedIndex] = updatedProduct;

      return {
        ...state,
        products: updatedProducts,
        edittedIndex: -1,
        edittedProduct: null
      };

    case ProductActions.DELETE_PRODUCT:
      const deletedProducts = [...state.products];
      deletedProducts.splice(state.edittedIndex, 1);
      return {
        ...state,
        products: deletedProducts,
        edittedIndex: -1,
        edittedProduct: null
      };

    case ProductActions.START_EDIT:
      return {
        ...state,
        edittedIndex: action.payLoad,
        edittedProduct: { ...state.products[action.payLoad] },
      };

    case ProductActions.STOP_EDIT:
      return {
        ...state,
        edittedIndex: -1,
        edittedProduct: null
      };

    default:
      return state;
  }
}
