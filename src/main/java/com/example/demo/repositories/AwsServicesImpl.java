package com.example.demo.repositories;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.amazonaws.services.s3.model.S3Object;

public interface AwsServicesImpl {
	public com.amazonaws.services.s3.model.PutObjectResult upload(
			String path,
			String fileName,
			Optional<Map<String, String>> optionalMetaData,
			InputStream inputStream
	);
	public S3Object download(String path, String fileName);
	//String saveFile(MultipartFile file);
	//byte[] downloadFile(String fileName);
	String deleteFile(String fileName);
	List<String> listAllFiles();
}
