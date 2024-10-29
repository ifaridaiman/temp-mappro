'use client'
import { useState, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { ArahanTypeEnum, NoSiriEnum, PengkelasanEnum } from "../enum/formEnum";


export const useDrawQuery = () => {

    
    const [selectedPengkelasan, setSelectedPengkelasan] = useState<PengkelasanEnum | null>(null);
    const [noLembar, setNoLembar] = useState<string[]>([])
    const [state, setState] = useState<string[]>([])
    const [district, setDistrict] = useState<string[]>([])
    const [mukim, setMukim] = useState<string[]>([])

    

    const { fieldNoLembar, fieldDistrict, fieldState, fieldMukim } = useThemeContext();

    useEffect(() => {
        if (fieldNoLembar) {
            setNoLembar(fieldNoLembar); // Assume fieldNoLembar is a string[]
        }
    }, [fieldNoLembar]);

    useEffect(() => {
        if (fieldDistrict) {
            setDistrict(fieldDistrict)
        }
    }, [fieldDistrict])

    useEffect(() => {
        if (fieldState) {
            setState(fieldState)
        }
    }, [fieldState])

    useEffect(() => {
        if (fieldMukim) {
            setMukim(fieldMukim)
        }
    }, [fieldMukim])

    const handleNoLembar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoLembar(e.target.value.split(','))
    }

    const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value.split(','))
    }
    const handleDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDistrict(e.target.value.split(','))
    }
    const handleMukim = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMukim(e.target.value.split(','))
    }

    return {
        state,
        handleState,
        district,
        handleDistrict,
        mukim,
        handleMukim,
        noLembar,
        handleNoLembar,
        selectedPengkelasan, 
        setSelectedPengkelasan
    }
}