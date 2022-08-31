import { environmentService } from '@/services/environments/environment.service';
import { getRequestHandler, postRequestHandler } from '@/services/handler/request.handler';

const state = {
    AllFacility: [],
    CalculateResult: [],
},

    getters = {
        AllFacility: state => state.AllFacility,
        CalculateResult: state => state.CalculateResult,
    },

    mutations = {

    },

    actions = {
        async getAllFacility({ state }, payload) {
            await getRequestHandler(`${environmentService}/api/Facilty/GetAll?options=${payload}`).then(async result => {
                state.AllFacility = result.data;
            });
        },
        async SendCalculate({ state }, payload) {
            state.CalculateResult = []
            await postRequestHandler(`${environmentService}/Historic/Calculate`, payload).then(async result => {
                state.CalculateResult = result.data;
            })
        },
    };

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
