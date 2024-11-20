import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ResultData } from "@/api/interface/base";
// import { useTokenStore} from "@/store/useTokenStore"

const config = {
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
}

class RequestHttp {
    service: AxiosInstance;

    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);

        // const token = useTokenStore.getState().token;

        // 请求拦截器
        this.service.interceptors.request.use(
            function (config) {
                config.baseURL =  '';

                // if (token) {
                //     config.headers.Token = `${token}`;
                // }


                config.headers.Token = 'YIG8ANC8q2QxFV_Gf8qwkPdBj2EpsqGqlfc3qvSdg7ksVkZcokOUtQn43XGK0NK3BXUDsyebUlpKIFKXISMXA6nB0kpNgtZ2Vus-0ALbiLKPW74oqXtwUlA_aJyQP-hq' ;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        )

        // 响应拦截器
        this.service.interceptors.response.use(
            function (response) {
                return response.data;
            },
            function (error) {
                return Promise.reject(error);
            }
        )
    }
    // 自定义方法封装（常用请求）
    get<T>(url: string, params ?: object): Promise < ResultData < T >> {
        return this.service.get(url, { params });
    }

    post<T>(url: string, params ?: object): Promise < ResultData < T >> {
        return this.service.post(url, params);
    }

    put<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }
    delete<T>(url: string, params: object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, params);
    }
}


export default new RequestHttp(config);