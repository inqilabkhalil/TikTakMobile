import * as Yup from 'yup';

export const accountInfoSchema = Yup.object({
    full_name: Yup.string()
    .trim()
    .min(3, 'Ad ən az 3 simvol olmalıdır')
    .required('Ad Soyad məcburidir'),

    email: Yup.string()
    .trim()
    .email('E-mail düzgün formatda deyil')
    .required('E-mail məcburidir'),

    address: Yup.string()
    .trim()
    .min(3, 'Ünvan ən az 3 simvol olmalıdır')
    .required('Ünvan məcburidir'),

    phone: Yup.string()
    .trim()
    .required('Telefon məcburidir'),

    password: Yup.string()
    .min(6, 'Şifrə ən az 6 simvol olmalıdır')
    .notRequired(),

    password_repeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifrələr uyğun gəlmir')
    .when('password', {
      is: (val: string) => !!val && val.length > 0,
      then: (schema) => schema.required('Şifrəni təkrarlayın'),
      otherwise: (schema) => schema.notRequired(),
    }),
})