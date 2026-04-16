import { Socket } from "socket.io";
import fs from "fs/promises";

interface EventPayload {
  data: string;
  pathToFileOrDir: string;
}

export const handleEditorSocketEvents = (socket: Socket) => {
  socket.on("writeFile", async ({ data, pathToFileOrDir }: EventPayload) => {
    try {
      await fs.writeFile(pathToFileOrDir, data);
      socket.emit("writeFileSuccess", {
        data: "File written successfully",
      });
    } catch (error) {
      console.log("Error while writing file", error);
      socket.emit("writeFileError", error);
    }
  });

  socket.on("createFile", async ({ pathToFileOrDir }: EventPayload) => {
    try {
      // 'wx' flag: Open for writing. Fails if the path exists.
      await fs.writeFile(pathToFileOrDir, "", { flag: "wx" });

      socket.emit("createFileSuccess", {
        data: "File created successfully",
      });
    } catch (error: any) {
      if (error.code === "EEXIST") {
        socket.emit("createFileError", { data: "File already exists" });
      } else {
        console.log("Error while creating file", error);
        socket.emit("createFileError", { data: "Failed to create file" });
      }
    }
  });

  socket.on("readFile", async ({ pathToFileOrDir }: EventPayload) => {
    try {
      const data = await fs.readFile(pathToFileOrDir, "utf-8");
      socket.emit("readFileSuccess", { data, pathToFileOrDir });
    } catch (error) {
      console.log("Error while reading file", error);
      socket.emit("readFileError", error);
    }
  });

  socket.on("deleteFile", async ({ pathToFileOrDir }: EventPayload) => {
    try {
      await fs.unlink(pathToFileOrDir);
      socket.emit("deleteFileSuccess", {
        data: "File deleted successfully",
      });
    } catch (error) {
      console.log("Error while deleting file", error);
      socket.emit("deleteFileError", error);
    }
  });

  socket.on("renameFile", async ({ pathToFileOrDir }: EventPayload) => {
    try {
      await fs.rename(pathToFileOrDir, pathToFileOrDir);
      socket.emit("renameFileSuccess", {
        data: "File renamed successfully",
      });
    } catch (error) {
      console.log("Error while renaming file", error);
      socket.emit("renameFileError", error);
    }
  });

  socket.on("createDirectory", async ({ pathToFileOrDir }: EventPayload) => {
    try {
      await fs.mkdir(pathToFileOrDir);
      socket.emit("createDirectorySuccess", {
        data: "Directory created successfully",
      });
    } catch (error) {
      console.log("Error while creating directory", error);
      socket.emit("createDirectoryError", error);
    }
  });

  socket.on("deleteDirectory", async ({ pathToFileOrDir }: EventPayload) => {
    try {
      await fs.rm(pathToFileOrDir, { recursive: true });
      socket.emit("deleteDirectorySuccess", {
        data: "Directory deleted successfully",
      });
    } catch (error) {
      console.log("Error while deleting directory", error);
      socket.emit("deleteDirectoryError", error);
    }
  });

  socket.on("renameDirectory", async ({ pathToFileOrDir }: EventPayload) => {
    try {
      await fs.rename(pathToFileOrDir, pathToFileOrDir);
      socket.emit("renameDirectorySuccess", {
        data: "Directory renamed successfully",
      });
    } catch (error) {
      console.log("Error while renaming directory", error);
      socket.emit("renameDirectoryError", error);
    }
  });
};
