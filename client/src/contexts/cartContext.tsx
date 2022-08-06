import { createContext, Dispatch, SetStateAction } from "react"
import fruitsType from "../types/fruits"

export const CartContext = createContext<fruitsType | null>(null)