import { http, authHttp } from './http';

export default {
    addLinkApi: (data) => {
        return authHttp().post('api/add-links', data)
    },
    getAllLinksApi: () => {
        return authHttp().get('api/get-all-links')
    },
    getLinksApi: (data) => {
        return http.post('api/get-links', data)
    },
    updateLinksApi: (data) => {
        return authHttp().post('api/update-links', data)
    },
    updateProfileApi: (data) => {
        return authHttp().post('api/update-profile', data)
    },
    updateSocialsApi: (data) => {
        return authHttp().post('api/update-socials', data)
    },
    getAllSocialsApi: () => {
        return authHttp().post('api/get-all-socials')
    },
    getSocialsApi: (data) => {
        return http.post('api/get-socials', data)
    },
    removeLinkApi: (data) => {
        return authHttp().post('api/remove-links', data)
    },
    updateThumbnailApi: (data) => {
        return authHttp().post('api/change-thumbnail', data)
    },
    updateAvtApi: (data) => {
        return authHttp().post('api/update-avatar', data)
    },
    updateCoverApi: (data) => {
        return authHttp().post('api/update-cover', data)
    },
    getAllThemesApi: () => {
        return authHttp().get('api/get-themes')
    },
    changeThemeApi: (data) => {
        return authHttp().post('api/change-theme', data)
    }
}
