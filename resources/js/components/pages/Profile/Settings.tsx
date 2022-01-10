import React, {FC} from "react";
import TextInput from "../../inputs/TextInput";
import {useTranslation} from "react-i18next";
import SelectInput from "../../inputs/SelectInput";

interface ISettingsProps {
    locale: string
    onChange: ({fieldName: string, value: any}) => void
}

const Settings: FC<ISettingsProps> = ({locale, onChange}) => {

    const {t} = useTranslation();

    const handleChangeLocale = (value: Array<string>) => {
        onChange({fieldName: 'locale', value: value[0]});
    };

    return (
        <>


            <SelectInput
                label={t("locale")}
                value={[locale]}
                onChange={handleChangeLocale}
                choices={{ru: t("localeRu"), en: t("localeEn")}}
            />
        </>
    )
};

export default Settings;
