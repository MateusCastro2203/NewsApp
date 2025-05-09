import RNFS from "react-native-fs";

const BASE_PATH = RNFS.DocumentDirectoryPath + "/offline_news";

export async function initializeStorage() {
  try {
    const exists = await RNFS.exists(BASE_PATH);
    if (!exists) {
      await RNFS.mkdir(BASE_PATH);
    }
  } catch (error) {
    console.error("Erro ao inicializar o armazenamento offline:", error);
    throw error;
  }
}

export async function downloadImage(
  url: string,
  articleId: string
): Promise<string | null> {
  try {
    const fileName = `${articleId}.jpg`;
    const filePath = `${BASE_PATH}/${fileName}`;

    const response = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true,
      discretionary: true,
      progress: (response) => {
        const progress = (response.bytesWritten / response.contentLength) * 100;
      },
    }).promise;

    if (response.statusCode === 200) {
      return filePath;
    }
    return null;
  } catch (error) {
    console.error("Erro ao baixar a imagem:", error);
    return null;
  }
}

export async function getStorageInfo(): Promise<{
  free: number;
  total: number;
}> {
  try {
    const stats = await RNFS.getFSInfo();
    return {
      free: stats.freeSpace,
      total: stats.totalSpace,
    };
  } catch (error) {
    console.error("Erro ao obter informações de armazenamento:", error);
    return { free: 0, total: 0 };
  }
}

export async function deleteFile(path: string): Promise<boolean> {
  try {
    if (await RNFS.exists(path)) {
      await RNFS.unlink(path);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erro ao deletar arquivo:", error);
    return false;
  }
}

export async function clearOldFiles(daysOld: number): Promise<void> {
  try {
    const files = await RNFS.readDir(BASE_PATH);
    const now = Date.now();
    const daysInMs = daysOld * 24 * 60 * 60 * 1000;

    for (const file of files) {
      const stats = await RNFS.stat(file.path);
      if (now - stats.mtime > daysInMs) {
        await deleteFile(file.path);
      }
    }
  } catch (error) {
    console.error("Erro ao limpar arquivos antigos:", error);
  }
}
