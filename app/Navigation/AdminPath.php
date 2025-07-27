<?php

namespace App\Navigation;

class AdminPath
{
    private const PREFIX = 'dashboard/admin';

    public static function view(string $path): string
    {
        return self::PREFIX . '/' . $path;
    }
}
