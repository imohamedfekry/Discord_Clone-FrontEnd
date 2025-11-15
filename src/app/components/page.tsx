"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { PrimaryButton } from "../../components/ui/primary-button";
import { CustomCheckbox } from "../../components/ui/custom-checkbox";
import { SelectInput } from "../../components/ui/select-input";
import Tooltip from "../../components/ui/Tooltip";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const selectOptions = [
    { value: "one", label: "Option One" },
    { value: "two", label: "Option Two" },
    { value: "three", label: "Option Three" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-3xl mx-auto">
      <h1 className="text-center text-2xl font-semibold">
        UI Components Playground
      </h1>

      <section className="grid grid-cols-2 gap-4 items-center">
        <div>
          <h2 className="text-lg font-medium mb-2">Avatar</h2>
          {/* <Avatar src="/favicon.ico" alt="test avatar" /> */}
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Badge</h2>
          <Badge count={5} color="red" />
          <Badge label="New" color="gray" />
          <Badge icon={
              <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm1-18a1 1 0 1 0-2 0v7c0 .27.1.52.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.58V5Z" clipRule="evenodd" className=""></path></svg>
          } label="Pro" color="green" />{" "}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Buttons</h2>
        <div className="flex gap-4 items-center">
          <Button onClick={() => alert("Button clicked")}>
            Default Button
          </Button>
          <PrimaryButton onClick={() => alert("Primary clicked")}>
            Primary
          </PrimaryButton>

          <Tooltip text="هذا Tooltip تجريبي">
            <span>
              <PrimaryButton disabled>Disabled (hover me)</PrimaryButton>
            </span>
          </Tooltip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Input</h2>
        <Input
          label="Test Input"
          placeholder="type something..."
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Custom Checkbox</h2>
        <div className="flex items-center gap-4">
          <CustomCheckbox
            id="cb-1"
            label="I agree (checkbox with label)"
            checked={checked}
            onChange={(v) => setChecked(v)}
          />
          <CustomCheckbox id="cb-2" checked={false} onChange={() => {}} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Select Input</h2>
        <SelectInput
          options={selectOptions}
          value={selectValue}
          onChange={(v) => setSelectValue(v)}
          placeholder="Choose an option"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Modal</h2>
        <div className="flex gap-4">
          <PrimaryButton onClick={() => setOpen(true)}>
            Open Modal
          </PrimaryButton>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>

        {/* <Modal open={open} onClose={() => setOpen(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Modal Content</h3>
            <p className="mb-4">This is a test modal. Close to return.</p>
            <PrimaryButton onClick={() => setOpen(false)}>Close</PrimaryButton>
          </div>
        </Modal> */}
      </section>

      <section>
        <h2 className="text-lg font-medium">Tooltip (example)</h2>
        <Tooltip side="right" text="Tooltip: اضغط هنا لمزيد">
          <Button onClick={() => {}}>Hover me</Button>
        </Tooltip>
      </section>
    </div>
  );
}
