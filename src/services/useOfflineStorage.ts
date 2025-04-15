import * as FileSystem from "expo-file-system";

const BASE_PATH = FileSystem.documentDirectory + "offline_news";

export async function initializeStorage() {
  try {
    const dirInfo = await FileSystem.getInfoAsync(BASE_PATH);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(BASE_PATH);
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

    const downloadResult = await FileSystem.downloadAsync(url, filePath, {
      sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
    });

    if (downloadResult.status === 200) {
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
    // Expo FileSystem não tem método direto para isso
    // Retornando valores padrão por enquanto
    return { free: 1000000000, total: 5000000000 };
  } catch (error) {
    console.error("Erro ao obter informações de armazenamento:", error);
    return { free: 0, total: 0 };
  }
}

export async function deleteFile(path: string): Promise<boolean> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(path);
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
    const files = await FileSystem.readDirectoryAsync(BASE_PATH);
    const now = Date.now();
    const daysInMs = daysOld * 24 * 60 * 60 * 1000;

    for (const fileName of files) {
      const filePath = `${BASE_PATH}/${fileName}`;
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists && fileInfo.modificationTime) {
        if (now - fileInfo.modificationTime > daysInMs) {
          await deleteFile(filePath);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao limpar arquivos antigos:", error);
  }
}
