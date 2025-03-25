import { Service } from "../feature/web/child/service/service.component"

export interface CustomerRequest {
    projectName: string
    projectArea: string,
    completionTime: string
    maxEstimatedPrice: number
    minEstimatedPrice: number
    selectedService: Service
    customerFullname: string
    customerPhone: string
    customerEmail: string
    createdAt: Date,
    updatedat: Date
}

export interface CustomerRequestInput {
    projectName: string
    projectArea: string,
    completionTime: string
    maxEstimatedPrice: number
    minEstimatedPrice: number
    selectedService: Service
    customerFullname: string
    customerPhone: string
    customerEmail: string
}