import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectProps {
    onChange: (value:string) => void, 
    value ?:string
    placeholder ?:string,
    data : ItemProps[]
}

interface ItemProps {
    value : string,
    text : string
}

export function SelectDefault({ 
    value, 
    onChange, 
    placeholder,
    data 
} : SelectProps) {  
    return (
        <Select 
            onValueChange={onChange} 
            defaultValue={value}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder ? placeholder : 'Selecione...'} />
            </SelectTrigger>
            <SelectContent>
                { data.map((item, index) => {
                    return <SelectItem 
                        value={item.value}
                        key={index}
                    >
                        { item.text }
                    </SelectItem>
                })}
            </SelectContent>
        </Select>
    )
}
