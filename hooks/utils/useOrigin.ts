"use client";

import React, { useEffect, useMemo, useState } from "react";

type Origin = {
    origin: string;
};

function useOrigin(): Origin {
    const [hasMounted, setHasMounted] = useState(false);
    const origin = useMemo(() => {
        return typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";
    }, []);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return {
        origin,
    };
}

export default useOrigin;
