import React, { Fragment } from 'react';
import { Path } from 'react-native-svg'
import { TouchableOpacity, View, Text } from 'react-native';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { UserIcon } from 'react-native-heroicons/outline';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export default function AccountIconMenu() {
  return (
    <View style={{ position: 'relative' }}>
        <TouchableOpacity classNames="h-35 w-35">
            <UserIcon size={35} color="00CCBB"/>
        </TouchableOpacity>
    </View>
  );
}