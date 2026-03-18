interface Props {
    search: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input ({search, onChange}: Props) {
    return (
        <div style={{ marginBottom: 20 }}>
        <input
          placeholder="search user"
          value={search}
          onChange={onChange}
        />
      </div>
    )
}