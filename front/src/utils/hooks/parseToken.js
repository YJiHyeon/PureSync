import getHeaderCookie from './getHeaderCookie';

function parseLockToken(lockToken) {

    function remove(str, index, length) {
        return str.substring(0, index) + str.substring(index + length);
    }
    lockToken = remove(lockToken, 199, "01Kej11".length);
    lockToken = remove(lockToken, 122, "9YrH7".length);
    lockToken = remove(lockToken, 77, "Bus9712".length);
    lockToken = remove(lockToken, 58, "Spu935".length);

    return lockToken;
}

export function parseJwt(token) {
    try {
        let processedToken =  parseLockToken(token)
        const base64Payload = processedToken.split('.')[1];
        const payload = atob(base64Payload);
        console.log("파싱토큰:::::::::::",processedToken);
        return JSON.parse(payload);
    } catch (e) {
        console.error('JWT 디코딩 중 오류 발생:', e);
        return null;
    }
}

// JWT 토큰에서 memId와 memSeq 추출
export function getMemInfoFromToken() {
    const token = getHeaderCookie();
    const decodedToken = parseJwt(token);

    if (decodedToken) {
        const memId = decodedToken.memId;
        const memSeq = decodedToken.memSeq;
        const memEmail = decodedToken.memEmail;
        const memImg = decodedToken.memImg;
        console.log("memId",memId);
        console.log("memSeq",memSeq);
        console.log("memEmail",memEmail);
        console.log("memImg",memImg);
    
        return { memId, memSeq, memEmail, memImg };
    }

    return null;
}

export const memInfo = getMemInfoFromToken();
if (memInfo) {
    console.log('memId:', memInfo.memId, 'memSeq:', memInfo.memSeq, 'memEmail:', memInfo.memEmail);
}

