import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '@app/components/basic/buttons/Button';
import Error from '@app/components/basic/Error';
import InputField from '@app/components/basic/InputField';
import attemptLogin from '@app/components/utilities/attemptLogin';
import { getTranslatedStaticProps } from '@app/components/utilities/withTranslateProps';

/**
 * 1st step of login - user enters their username and password
 * @param {Object} obj
 * @param {String} obj.email - email of user
 * @param {Function} obj.setEmail - function to set the email of user
 * @param {String} obj.password - password of user
 * @param {String} obj.setPassword - function to set the password of user
 * @param {Function} obj.setStep - function to set the login flow step
 * @returns
 */
export default function LoginStep ({
    email,
    setEmail,
    password,
    setPassword,
    setStep
}: {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    setStep: (step: number) => void;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const { t } = useTranslation();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                return;
            }
                        
            setIsLoading(true); 
            const isLoginSuccessful = await attemptLogin(email, password);
            if (isLoginSuccessful && isLoginSuccessful.success) {
                // case: login was successful

                if (isLoginSuccessful.mfaEnabled) {
                    // case: login requires MFA step
                    setStep(2);
                    setIsLoading(false);
                    return;
                }

                // case: login does not require MFA step
                router.push(`/dashboard/${localStorage.getItem('projectData.id')}`);
            }

        } catch (err) {
            console.error(err);
            setLoginError(true);
        }
        
        setIsLoading(false);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="bg-bunker w-full max-w-md mx-auto h-7/12 py-4 pt-8 px-6 rounded-xl drop-shadow-xl">
            <p className="text-3xl w-max mx-auto flex justify-center font-semibold text-bunker-100 mb-6">
                {t('login:login')}
            </p>
            <div className="flex items-center justify-center w-full md:p-2 rounded-lg mt-4 md:mt-0 max-h-24 md:max-h-28">
                <InputField
                label={t('common:email')}
                onChangeHandler={setEmail}
                type="email"
                value={email}
                placeholder=""
                isRequired
                autoComplete="username"
                />
            </div>
            <div className="relative flex items-center justify-center w-full md:p-2 rounded-lg md:mt-2 mt-6 max-h-24 md:max-h-28">
                <InputField
                label={t('common:password')}
                onChangeHandler={setPassword}
                type="password"
                value={password}
                placeholder=""
                isRequired
                autoComplete="current-password"
                id="current-password"
                />
                <div className="absolute top-2 right-3 text-primary-700 hover:text-primary duration-200 cursor-pointer text-sm">
                <Link href="/verify-email">
                    <button
                    type="button"
                    className="text-primary-700 hover:text-primary duration-200 font-normal text-sm underline-offset-4 ml-1.5"
                    >
                    {t('login:forgot-password')}
                    </button>
                </Link>
                </div>
            </div>
            {!isLoading && loginError && <Error text={t('login:error-login') ?? ''} />}
            <div className="flex flex-col items-center justify-center w-full md:p-2 max-h-20 max-w-md mt-4 mx-auto text-sm">
                <div className="text-l mt-6 m-8 px-8 py-3 text-lg">
                <Button
                    type="submit"
                    text={t('login:login') ?? ''}
                    onButtonPressed={async () => handleLogin()}
                    loading={isLoading}
                    size="lg"
                />
                </div>
            </div>
            </div>
            {false && (
            <div className="w-full p-2 flex flex-row items-center bg-white/10 text-gray-300 rounded-md max-w-md mx-auto mt-4">
                <FontAwesomeIcon icon={faWarning} className="ml-2 mr-6 text-6xl" />
                {t('common:maintenance-alert')}
            </div>
            )}
            <div className="flex flex-row items-center justify-center md:pb-4 mt-4">
            <p className="text-sm flex justify-center text-gray-400 w-max">
                {t('login:need-account')}
            </p>
            <Link href="/signup">
                <button
                type="button"
                className="text-primary-700 hover:text-primary duration-200 font-normal text-sm underline-offset-4 ml-1.5"
                >
                {t('login:create-account')}
                </button>
            </Link>
            </div>
        </form>
    );
}

export const getStaticProps = getTranslatedStaticProps(['auth', 'login']);