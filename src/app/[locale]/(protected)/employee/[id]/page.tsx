import { type JSX } from 'react';

const EmployeeUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> => {
  const { id } = await params;

  return <div>Employee Update Page {id}</div>;
};

export default EmployeeUpdatePage;
