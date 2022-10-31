<template>
    <DefaultLayout>
        <p class="text-neutral text-5xl my-5">Register Service</p>
        <Form @submit="handleRegister" :validation-schema="schema">
            <div class="grid grid-cols-2">
                <div class="form-control w-full max-w-xs">
                    <label class="label text-primary-700" for="username">
                        <span class="label-text">
                            Username
                        </span>
                    </label>
                    <Field name="username" type="text" class="input input-bordered w-full max-w-xs" placeholder="username"/>
                    <label class="label text-primary-700">
                        <span class="label-text-alt">
                            <ErrorMessage name="username" class="text-error" />
                        </span>
                    </label>
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label text-primary-700" for="password">
                        <span class="label-text">
                            Password
                        </span>
                    </label>
                    <Field name="password" type="password" class="input input-bordered w-full max-w-xs" placeholder="password"/>
                    <label class="label text-primary-700">
                        <span class="label-text-alt">
                            <ErrorMessage name="password" class="text-error" />
                        </span>
                    </label>
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label text-primary-700" for="passwordConfirmation">
                        <span class="label-text">
                            Confirm Password
                        </span>
                    </label>
                    <Field name="passwordConfirmation" type="password" class="input input-bordered w-full max-w-xs" placeholder="confirm password"/>
                    <label class="label text-primary-700">
                        <span class="label-text-alt">
                            <ErrorMessage name="passwordConfirmation" class="text-error" />
                        </span>
                    </label>
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label text-primary-700" for="pic">
                        <span class="label-text">
                            Insert your profile picture
                        </span>
                    </label>
                    <Field @change="handleUploadPic" name="pic" type="file" class="input w-full max-w-xs" placeholder="upload your file"/>
                    <label class="label text-primary-700">
                        <span class="label-text-alt">
                            <ErrorMessage name="pic" class="text-error" />
                        </span>
                    </label>
                </div>
            </div>

            <div class="flex justify-end mt-6">
                <button class="btn btn-primary">Sign up</button>
            </div>
        </Form>
    </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import RegisterService from '@/service/authService.js';
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import Nprogress from 'nprogress';

const router = useRouter();
const registered = ref({})
const file = ref('')

const schema = yup.object().shape({
    username:
        yup.string()
            .required('Username is required!')
            .min(4, 'Must be at least 4 characters!')
            .max(20, 'Must be maximum 20 characters'),
    
    password:
        yup.string()
            .required("password is required")
            .min(6, "Must be at least 6 character")
            .max(40, "no longer than 40 character"),
    passwordConfirmation:
        yup.string()
            .required("you need to confirm you password")
            .oneOf([yup.ref("password")], "password is not match"),
    pic:
        yup.string()
            .required("Your picture is required!")
});

const handleRegister = (values) => {
    Nprogress.start();
    RegisterService.register(values,file.value)
        .then((response) => {
            registered.value = response.data
            Nprogress.done();
            router.push({
                name:"Home"
            })
        })
        .catch((error) => {
            console.log(error)
        })

}

const handleUploadPic = (e) => {
    RegisterService.uploadFile(e.target.files[0])
        .then((res) => {
            file.value = res.data
        })
        .catch((err) => {
            console.log(err)
        })
}
</script>