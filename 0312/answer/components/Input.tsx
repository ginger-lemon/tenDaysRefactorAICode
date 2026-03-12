import { User } from "../types/userType";

interface Props {
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export function Input ({value, handleChange}: Props) {
    return (
        <input
        placeholder="search"
        value={value}
        onChange={handleChange}
      />
    )
}