import React from "react";
import CreatableSelect from "react-select/creatable";
import { ValueType } from "react-select/src/types";
import { useData } from "../hooks";
import { IBookmark, ISelectOption } from "../typing";

const styles = {
  control: (base: React.CSSProperties) => ({
    ...base,
    border: 0,
    borderRadius: 0,
    boxShadow: "none",
    paddingLeft: 5,
  }),
  menu: (base: React.CSSProperties) => ({
    ...base,
    borderRadius: 0,
  }),
  option: (base: React.CSSProperties) => ({
    ...base,
    color: "black",
  }),
};

const createOption = (tag: string): ISelectOption => ({
  label: tag,
  value: tag,
});

export const TagSelect: React.FC<{
  onChange: (tags: IBookmark["tags"]) => void;
  tags: IBookmark["tags"];
}> = ({ onChange, tags }) => {
  const { getTags } = useData();

  const [autoCompletes, setAutoCompletes] = React.useState<ISelectOption[]>(
    getTags().map(createOption),
  );

  const handleInputChange = (inputValue: string) => {
    setAutoCompletes(
      getTags()
        .filter((tag) => tag.includes(inputValue))
        .map(createOption),
    );
  };

  const handleChange = (inputs: ValueType<ISelectOption, true>) => {
    if (inputs) onChange(inputs.map(({ value }) => value.trim()));
  };

  const value: ISelectOption[] = tags.map(createOption);

  return (
    <CreatableSelect
      isClearable={false}
      isMulti
      noOptionsMessage={() => "No tag"}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={autoCompletes}
      placeholder="Add a tag"
      styles={styles}
      value={value}
    />
  );
};
