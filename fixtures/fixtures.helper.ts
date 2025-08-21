import { faker } from "@faker-js/faker";

export class ApiHelper {

    private static CLUSTER_NAME: string =  faker.string.alpha(5);

    clusterName(){
        return ApiHelper.CLUSTER_NAME
    }
}