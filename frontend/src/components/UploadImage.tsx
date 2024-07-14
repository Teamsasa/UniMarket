import React, { useState } from "react";
import AWS from "aws-sdk";

const S3_BUCKET = "real-api-key";
const REGION = "real-api-key";

// 警告: 実際の環境でこのように認証情報を扱うことは極めて危険
AWS.config.update({
  accessKeyId: "real-api-key",
  secretAccessKey: "real-api-key",
});

const s3 = new AWS.S3({
  region: REGION,
});

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleUpload = async () => {
    if (!file) return;

    // ファイル名をエンコード
    const encodedFileName = encodeURIComponent(file.name);

    const params = {
        Bucket: S3_BUCKET,
        Key: `uploads/${Date.now()}-${encodedFileName}`,
        Body: file,
        ContentType: file.type,
      };

    try {
      const uploadResult = await s3.upload(params).promise();
      console.log("File uploaded successfully:", uploadResult);

      // 画像URLをバックエンドに送信
      await sendProductInfo({
        ...productInfo,
        imageUrl: uploadResult.Location,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const sendProductInfo = async (data: any) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save product info");
      }

      const result = await response.json();
      console.log("Product info saved successfully:", result);
      // ここで成功メッセージを表示するなどの処理を追加できる
    } catch (error) {
      console.error("Error saving product info:", error);
      // ここでエラーメッセージを表示するなどの処理を追加できる
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                商品画像
              </label>
              <div className="mt-1 flex justify-center px-6 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-1 w-1 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    // viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>ファイルを選択</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">またはドラッグ＆ドロップ</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            {/* 他のフォーム要素は変更なし */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                商品名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productInfo.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                商品説明
              </label>
              <textarea
                id="description"
                name="description"
                value={productInfo.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                価格
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productInfo.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleUpload}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                出品する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
