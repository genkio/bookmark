import React from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, ValueType } from "react-select/src/types";
import { useData } from "../hooks";
import { IBookmark, ISelectOption } from "../typing";

const style = {
  control: (base: React.CSSProperties) => ({
    ...base,
    border: 0,
    boxShadow: "none",
    paddingLeft: 5,
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

  const handleChange = (
    inputs: ValueType<ISelectOption, true>,
    _: ActionMeta<ISelectOption<string>>,
  ) => {
    if (inputs) onChange(inputs.map(({ value }) => value));
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
      styles={style}
      value={value}
    />
  );
};
