import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

// Contexts
import { useSidebarContext } from '../contexts/SidebarContext';

// Components
import Navbar from './Navbar';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';

// Types
type RegisterForm = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
};

const Register = ({ history }: RouteComponentProps) => {
    // Contexts
    const sidebarContext = useSidebarContext();

    // States
    const initForm: RegisterForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };
    const [form, setForm] = useState<RegisterForm>(initForm);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post(`${process.env.REACT_APP_API_URL}/register`, form)
            .then((res) => {
                toast.success(res.data.detail, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setIsLoading(false);
                setForm(initForm);
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.detail, {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setIsLoading(false);
            });
    }

    return (
        <div>
            <Navbar leftButton={{
                icon: (<FaBars size="0.83rem" />),
                onClick: sidebarContext.toggleSidebar,
            }} />

            <header className="text-center text-white pt-19 px-16 pb-10 md:pt-25">
                <h1 className="text-lg font-extrabold leading-snug mb-2">
                    Daftar Sekarang
                </h1>
                <p className="text-sm font-semibold md:mx-auto md:w-1/5">Daftar sekarang dan mulai belajar dengan berbagai fitur Sibisa.</p>
            </header>

            <main className="flex-grow">
                <section className="text-gray-900 px-4 mx-auto w-full md:w-1/3 md:pb-29">
                    <form
                        className="flex flex-col bg-white p-6 rounded-xl shadow-default"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="mt-2 mb-3">
                            <Input
                                label="Nama Lengkap"
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={form.name}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mt-2 mb-3">
                            <Input
                                label="Email"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="e.g. example@mail.com"
                                autoComplete="username"
                                required
                                value={form.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mt-2 mb-3">
                            <Input
                                label="Kata Sandi"
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                required
                                value={form.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mt-2 mb-6">
                            <Input
                                label="Konfirmasi Kata Sandi"
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                required
                                value={form.password_confirmation}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            <Button type="submit">
                                Daftar
                            </Button>
                        )}
                        {/* <p className="text-gray-500 text-sm text-center font-semibold my-4">
                            Sudah punya akun?
                        </p>
                        <Link to={`/login`}>
                            <Button bgColor="red-500" bgColorOn="red-600" type="button">
                                Masuk
                            </Button>
                        </Link> */}
                    </form>
                </section>
            </main>
        </div>
    )
};

export default Register;