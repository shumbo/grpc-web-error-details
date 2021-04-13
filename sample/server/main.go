package main

import (
	"context"
	"log"
	"net"

	pb "github.com/shumbo/grpc-web-error-details/sample/proto"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const (
	port = ":50051"
)

type server struct {
	pb.UnimplementedSampleServiceServer
}

func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func (s *server) SayError(ctx context.Context, in *pb.ErrorRequest) (*pb.HelloReply, error) {
	e := status.New(codes.Code(in.GetCode()), "Sample Failed Precondition")
	e2, err := e.WithDetails(
		&errdetails.RequestInfo{
			RequestId: "REQUEST_ID",
		},
		&errdetails.DebugInfo{
			StackEntries: []string{"stack_entry1", "stack_entry2", "stack_entry3"},
			Detail:       "Debug Info Detail",
		},
		&errdetails.QuotaFailure{
			Violations: []*errdetails.QuotaFailure_Violation{
				{
					Subject:     "SOME_QUOTA",
					Description: "Some quota exceeded",
				},
				{
					Subject:     "ANOTHER_QUOTA",
					Description: "Another quota exceeded",
				},
			},
		},
		&errdetails.ErrorInfo{
			Domain:   "github.com/shumbo/grpc-web-error-details/sample",
			Reason:   "Some Reason",
			Metadata: map[string]string{"metadata1": "foo", "metadata2": "bar"},
		},
		&errdetails.PreconditionFailure{
			Violations: []*errdetails.PreconditionFailure_Violation{
				{
					Subject:     "SOME_SUBJECT",
					Type:        "PRECONDITION_FAILURE_VIOLATION_1",
					Description: "First precondition failure violation",
				},
				{
					Subject:     "ANOTHER_SUBJECT",
					Type:        "PRECONDITION_FAILURE_VIOLATION_2",
					Description: "Second precondition failure violation",
				},
			},
		},
		&errdetails.BadRequest{
			FieldViolations: []*errdetails.BadRequest_FieldViolation{
				{
					Field:       "FIELD_1",
					Description: "FIELD_1 violation description",
				}, {
					Field:       "FIELD_2",
					Description: "FIELD_2 violation description",
				},
			},
		},
		&errdetails.RequestInfo{
			RequestId:   "REQUEST_ID",
			ServingData: "SERVING_DATA",
		},
		&errdetails.ResourceInfo{
			ResourceType: "some resource",
			ResourceName: "some resource name",
			Owner:        "owner of the resource",
			Description:  "description of the resource",
		},
		&errdetails.Help{Links: []*errdetails.Help_Link{
			{
				Description: "Some Help Page",
				Url:         "http://example.com",
			},
			{
				Description: "Another Help Page",
				Url:         "http://example.com",
			},
		}},
		&errdetails.LocalizedMessage{
			Locale:  "en-US",
			Message: "Some user friendly error message here",
		},
		&errdetails.LocalizedMessage{
			Locale:  "ja-JP",
			Message: "ユーザーフレンドリーなエラーメッセージです",
		},
	)
	if err != nil {
		return nil, e.Err()
	}
	return nil, e2.Err()
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterSampleServiceServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
