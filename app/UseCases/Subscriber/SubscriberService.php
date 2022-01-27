<?php

declare(strict_types=1);

namespace App\UseCases\Subscriber;

use App\Models\Admin\Admin;
use App\Models\Subscriber\Subscriber;

class SubscriberService
{
    public function createByUpdate(array $data): Subscriber
    {
        return Subscriber::create($data);
    }

    public function update(Subscriber $subscriber, array $data): Subscriber
    {
        $subscriber->fill($data);
        $subscriber->save();

        if (!empty($data["admin_id"])) {
            $admin = Admin::find($data["admin_id"]);

            if (!empty($admin)) {
                $subscriber->admin()->save($admin);
            }
        } elseif (!empty($subscriber->admin)) {
            $subscriber->admin->subscriber_id = null;
            $subscriber->admin->save();
        }

        $subscriber->refresh();

        return $subscriber;
    }

    public function block(Subscriber $subscriber, bool $block): Subscriber
    {
        $subscriber->blocked = $block;
        $subscriber->save();
        $subscriber->refresh();

        return $subscriber;
    }

    public function delete(Subscriber $subscriber)
    {
        $subscriber->delete();
    }

    public function deleteMany(array $data)
    {
        Subscriber::destroy($data["ids"]);
    }
}
