package com.example.demo.services;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.example.demo.repositories.AwsServicesImpl;

@Service
public class AwsServices implements AwsServicesImpl{
	
	@Value("${bucketName}")
	private String bucketName;
	
	@Autowired
	private AmazonS3 s3;

	@Async
    public String deleteFile(final String keyName) {
        final DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, keyName);
        s3.deleteObject(deleteObjectRequest);
        return "Removido com sucesso";
    }

	@Override
	public List<String> listAllFiles() {
		ListObjectsV2Result listObjectsV2Result =  s3.listObjectsV2(bucketName);
		return listObjectsV2Result.getObjectSummaries().stream().map(S3ObjectSummary::getKey).collect(Collectors.toList());
	}

	@Override
	public com.amazonaws.services.s3.model.PutObjectResult upload(String path, String fileName, Optional<Map<String, String>> optionalMetaData,
			InputStream inputStream) {
		ObjectMetadata objectMetadata = new ObjectMetadata();
		optionalMetaData.ifPresent(map ->{
			if(!map.isEmpty()){
				map.forEach(objectMetadata::addUserMetadata);
			}
		});
		return s3.putObject(path, fileName, inputStream, objectMetadata);
	}

	@Override
	public S3Object download(String path, String fileName) {
		return s3.getObject(path, fileName);
	}
}
