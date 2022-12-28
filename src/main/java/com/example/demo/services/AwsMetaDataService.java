package com.example.demo.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.S3Object;
import com.example.demo.entities.Aws;
import com.example.demo.repositories.AwsMetaData;
import com.example.demo.repositories.AwsRepositories;
import com.example.demo.repositories.AwsServicesImpl;

@Service
public class AwsMetaDataService implements AwsMetaData{
	
	@Autowired
	private AwsServicesImpl awsServicesImpl;
	
	@Autowired
	private AwsRepositories awsRepositories;
	
	@Value("${bucketName}")
	private String bucketName;

	public String upload(MultipartFile file, String url) throws IOException {
		if(file.isEmpty()){
			throw new IllegalStateException("O sistema não aceita requisições nulas");
		}
		Map<String, String> metaData = new HashMap<>();
		metaData.put("Content-Type", file.getContentType());
		metaData.put("Content-lenght", String.valueOf(file.getSize()));
		String bucket = String.format("%s", bucketName);
		String path = String.format("/%s", UUID.randomUUID());
		String fileName = String.format("%s", file.getOriginalFilename().replace(" ", ""));
		String Url = "https://"+ bucket +".s3.amazonaws.com"+ path + "/" + fileName;
		
		com.amazonaws.services.s3.model.PutObjectResult putObjectResult = awsServicesImpl.upload(
				bucket+path, fileName, Optional.of(metaData), file.getInputStream()
		);		
		awsRepositories.save(new Aws(fileName, Url, putObjectResult.getMetadata().getVersionId()));
		return Url;
	} 

	@Override
	public S3Object download(int id) {
		Aws aws = awsRepositories.findById(id).orElseThrow(() -> new EntityNotFoundException());
		return awsServicesImpl.download(aws.getFilePath(), aws.getFileName());
	}

	@Override
	public List<Aws> list() {
		List<Aws> aws = new ArrayList<>();
		awsRepositories.findAll().forEach(aws::add);
		return aws;
	}

}
