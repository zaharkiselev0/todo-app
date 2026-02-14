import { useState, useEffect } from 'react';
import { getUser } from '../resources/authApi.js';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { logoutUser } from '../resources/authApi.js';

export function useUser(){
    const queryClient = useQueryClient();

    const user = useQuery({
        queryKey: ['user'],
        queryFn: ({ signal }) => getUser(signal),
    });

    function logout(){
        logoutUser();
        queryClient.invalidateQueries(['user']);
    }

    return {user: user?.data, logout};
}