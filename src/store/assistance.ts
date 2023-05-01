import { Client } from '@/types'
import { create } from 'zustand'

type AssistanceState = {
    initialLoad: Array<any>
    assistants: Array<any>
    loadAssistants: (loadedAssistants: any) => void
    addAssistant: (client: Client) => void
}

export const useAssistStore = create<AssistanceState>((set) => {
    return {
        initialLoad: [],
        assistants: [],

        loadAssistants: (loadedAssistants: any) =>
            set(() => {
                return {
                    initialLoad: loadedAssistants,
                }
            }),

        addAssistant: (client: Client) =>
            set(({ assistants }) => {
                return {
                    assistants: assistants.concat(client),
                }
            }),

        removeAssistant: (id: number) => set(() => ({})),

        // function addAssistantHandler(client: Client) {
        //     setAssitance((prev) => prev.concat(client))
        // },

        // function removeAssistantHandler(id: number) {
        //     setAssitance((prev) => prev.filter((client) => client.id !== id))
        // },
    }
})
