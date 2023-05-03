import { Client } from '@/types'
import { create } from 'zustand'

type AssistanceState = {
    assistants: Array<any>
    initialLoad: Array<any>
    totalAssists: number
    loadAssistants: (loadedAssistants: any) => void
    addAssistant: (client: Client) => void
    removeAssistant: (id: number) => void
    incrementAssistantsNumber: () => void
    decrementAssistantsNumber: () => void
}

export const useAssistStore = create<AssistanceState>((set) => {
    return {
        initialLoad: [],
        assistants: [],
        totalAssists: 0,

        loadAssistants: (loadedAssistants: any) =>
            set((state) => {
                return {
                    initialLoad: loadedAssistants,
                    assistants: state.initialLoad,
                    totalAssists: state.initialLoad.length,
                }
            }),

        addAssistant: (client: Client) =>
            set(({ assistants }) => {
                return {
                    assistants: assistants.concat(client),
                }
            }),

        removeAssistant: (id: number) =>
            set((state) => ({
                assistants: state.assistants.filter(
                    (assistant) => assistant.id !== id
                ),
            })),

        incrementAssistantsNumber: () =>
            set(({ totalAssists }) => ({
                totalAssists: totalAssists + 1,
            })),

        decrementAssistantsNumber: () =>
            set(({ totalAssists }) => ({
                totalAssists: Math.max(totalAssists - 1, 0),
            })),
    }
})
