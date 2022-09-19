package com.example.demo.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.mediastoredata.model.PutObjectResult;
import com.amazonaws.services.s3.AmazonS3;
import com.example.demo.repositories.AwsServicesImpl;

@Service
public class AwsServices implements AwsServicesImpl{
	
	@Value("${bucketName}")
	private String bucketName;
	private final AmazonS3 s3;
	
	public AwsServices(AmazonS3 s3) {
		this.s3 = s3;
	}

	@Override
	public String saveFile(MultipartFile file) {
		String originalFileName = file.getOriginalFilename();
		try {
			File file1 = convertMultiPartToFile(file);
			com.amazonaws.services.s3.model.PutObjectResult putObjectResult = s3.putObject(bucketName, originalFileName, file1);
			return putObjectResult.getContentMd5();
		}catch(IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public byte[] downloadFile(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteFile(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> listAllFiles() {
		// TODO Auto-generated method stub
		return null;
	}
	
	private File convertMultiPartToFile(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}
}
