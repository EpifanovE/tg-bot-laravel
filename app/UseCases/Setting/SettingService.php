<?php

declare(strict_types=1);

namespace App\UseCases\Setting;

use App\Exceptions\DomainException;
use App\Models\Setting\Setting;
use Illuminate\Support\Facades\Lang;

class SettingService
{
    public function create(array $data)
    {
        $setting = Setting::create($data);
        return $setting;
    }

    public function update(Setting $setting, array $data)
    {
        if ($setting->built_in) {
            unset($data["code"]);
            unset($data["name"]);
            unset($data["type"]);
        }

        $setting->fill($data);
        $setting->save();
        $setting->refresh();

        return $setting;
    }

    public function delete(Setting $setting)
    {
        if ($setting->built_in) {
            throw new DomainException(Lang::get("notifications.cant_deleted"));
        }

        $setting->delete();
    }

    public function deleteMany(array $ids)
    {
        $collection = Setting::findMany($ids)->filter(function (Setting $setting) {
            return !$setting->built_in;
        });

        if ($collection->count() > 0) {
            $collection->toQuery()->delete();
        }
    }
}
