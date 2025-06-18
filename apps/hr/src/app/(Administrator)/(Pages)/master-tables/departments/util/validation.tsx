import * as Yup from 'yup';

export const departmentValidations = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    division_id: Yup.number().required('Division is required'),
    sorting: Yup.number()
      .typeError('Sorting must be a number')
      .required('Sorting is required'),
    stat: Yup.number().required('Status is required'),
});
