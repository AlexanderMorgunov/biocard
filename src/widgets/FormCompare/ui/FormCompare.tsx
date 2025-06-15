import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useFormCompare } from "../hooks/useFormCompare";

export const FormCompare = () => {
  const [form] = useForm();
  const { rules, handleSubmit, errorLengthMessage } = useFormCompare(form);
  return (
    <div className="flex flex-col p-6 w-full border border-gray-400 rounded-2xl ">
      <Form form={form} className="flex flex-col" onFinish={handleSubmit}>
        <Form.Item name="firstValue" label="Первое значение" rules={rules}>
          <Input placeholder="Введите первое значение" />
        </Form.Item>
        <Form.Item name="secondValue" label="Второе значение" rules={rules}>
          <Input placeholder="Введите второе значение" />
        </Form.Item>
        {errorLengthMessage && (
          <div className="text-error text-sm pb-1">{errorLengthMessage}</div>
        )}
        <Button type="primary" htmlType="submit" className="w-fit">
          Сравнить
        </Button>
      </Form>
    </div>
  );
};
